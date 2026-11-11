/**
 * ExamMate AI - Frontend API Client Service Layer
 * Communicates with Flask backend on /api/v1 via Vite proxy.
 * Includes token storage, Bearer headers, cookie credentials,
 * safe non-crashing JSON parsing, and graceful fallback to localStorage when backend is offline.
 */

import { StudentProgressState } from '../context/StudentProgressContext';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/+$/, '');
const AUTH_TOKEN_KEY = 'exammate_auth_token_v1';

export interface HealthCheckResponse {
  success: boolean;
  status: 'healthy' | 'unhealthy';
  environment: string;
  version: string;
  services: {
    server: { status: string; uptime_seconds: number };
    database: { status: string; engine: string; latency_ms: number; error?: string };
  };
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  institution: string;
  track: string;
  overallProgress: number;
  practiceDone: number;
  projectsBuilt: number;
  streakDays: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponseData {
  success: boolean;
  message?: string;
  token?: string;
  expiresAt?: string;
  user?: AuthUser;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface RequestOtpResponse {
  success: boolean;
  message?: string;
  email?: string;
  cooldownSeconds?: number;
  expiresInMinutes?: number;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: AuthUser;
  progress?: StudentProgressState;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * Safe JSON Parser: Reads response as text first to prevent
 * "SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input"
 * when the server or proxy returns an empty body, HTML error page, or connection refused.
 */
async function safeJsonParse<T = any>(res: Response): Promise<T | null> {
  try {
    const text = await res.text();
    if (!text || !text.trim()) {
      return null;
    }
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/**
 * Token Helpers
 */
export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  } catch {}
}

function getHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...customHeaders,
  };
  const token = getStoredToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Authentication Endpoints
 */
export async function apiRegister(payload: {
  name: string;
  email: string;
  password: string;
  institution?: string;
  track?: string;
}): Promise<AuthResponseData> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const json = await safeJsonParse<AuthResponseData>(res);
    if (!json) {
      return {
        success: false,
        error: {
          code: 'BACKEND_OFFLINE',
          message: 'Backend API is currently offline. Please start the backend with ./start.sh or python backend/run.py',
        },
      };
    }

    if (res.ok && json.token) {
      setStoredToken(json.token);
    }
    return json;
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Could not connect to backend server. Please run ./start.sh to launch the backend on port 5000.',
      },
    };
  }
}

export async function apiRegisterRequestOtp(payload: {
  name: string;
  email: string;
  password: string;
  institution?: string;
  track?: string;
}): Promise<RequestOtpResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/register/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const json = await safeJsonParse<RequestOtpResponse>(res);
    if (!json) {
      return {
        success: false,
        error: {
          code: 'BACKEND_OFFLINE',
          message: 'Backend API is currently offline. Please start the backend with ./start.sh or python backend/run.py',
        },
      };
    }
    return json;
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Could not connect to backend server. Please verify your connection or run ./start.sh.',
      },
    };
  }
}

export async function apiRegisterVerifyOtp(payload: {
  email: string;
  otp: string;
}): Promise<AuthResponseData> {
  try {
    const res = await fetch(`${API_BASE}/auth/register/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const json = await safeJsonParse<AuthResponseData>(res);
    if (!json) {
      return {
        success: false,
        error: {
          code: 'BACKEND_OFFLINE',
          message: 'Backend API is currently offline. Please start the backend with ./start.sh or python backend/run.py',
        },
      };
    }

    if (res.ok && json.token) {
      setStoredToken(json.token);
    }
    return json;
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Could not connect to backend server. Please verify your connection or run ./start.sh.',
      },
    };
  }
}

export async function apiLogin(payload: {
  email: string;
  password: string;
}): Promise<AuthResponseData> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const json = await safeJsonParse<AuthResponseData>(res);
    if (!json) {
      return {
        success: false,
        error: {
          code: 'BACKEND_OFFLINE',
          message: 'Backend API is currently offline. Please start the backend with ./start.sh or python backend/run.py',
        },
      };
    }

    if (res.ok && json.token) {
      setStoredToken(json.token);
    }
    return json;
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Could not connect to backend server. Please run ./start.sh to launch the backend on port 5000.',
      },
    };
  }
}

export async function apiLogout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
  } catch {}
  setStoredToken(null);
}

export async function apiGetMe(): Promise<ApiResponse<AuthUser> | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    if (!res.ok) {
      if (res.status === 401) setStoredToken(null);
      return null;
    }
    return await safeJsonParse<ApiResponse<AuthUser>>(res);
  } catch {
    return null;
  }
}

export async function apiUpdateProfile(payload: {
  name?: string;
  institution?: string;
  track?: string;
  current_password?: string;
  new_password?: string;
}): Promise<AuthResponseData> {
  try {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const json = await safeJsonParse<AuthResponseData>(res);
    if (!json) {
      return {
        success: false,
        error: {
          code: 'BACKEND_OFFLINE',
          message: 'Backend server is currently offline or returned an empty response.',
        },
      };
    }
    return json;
  } catch (err: any) {
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: err.message || 'Network error.' },
    };
  }
}

/**
 * Health & Diagnostics
 */
export async function checkBackendHealth(): Promise<HealthCheckResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok || res.status === 503) {
      return await safeJsonParse<HealthCheckResponse>(res);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Student Progress Endpoints
 */
export async function fetchStudentProgress(): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function syncStudentProgress(state: StudentProgressState): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress`, {
      method: 'PUT',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(state),
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function resetBackendProgress(): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress/reset`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function loadDemoBackendProgress(): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress/demo`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function toggleBackendTask(taskId: number): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress/toggle-task`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify({ taskId }),
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function toggleBackendResumeStep(stepIndex: number): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress/toggle-resume-step`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify({ stepIndex }),
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function solveBackendProblem(): Promise<StudentProgressState | null> {
  try {
    const res = await fetch(`${API_BASE}/student/progress/solve-problem`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    if (!res.ok) return null;
    const json = await safeJsonParse<ApiResponse<StudentProgressState>>(res);
    return json?.data || null;
  } catch {
    return null;
  }
}
