"""add student progress fields and checklists

Revision ID: 0002_progress_fields
Revises: 0001_initial_users
Create Date: 2026-11-10 19:30:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0002_progress_fields'
down_revision = '0001_initial_users'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('web_dev_progress', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('dsa_progress', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('js_progress', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('react_progress', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('python_progress', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('sql_progress', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('problems_solved', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('accuracy_percent', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('practice_streak', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('tasks', sa.JSON(), nullable=True))
    op.add_column('users', sa.Column('resume_steps', sa.JSON(), nullable=True))
    op.add_column('users', sa.Column('recent_mock', sa.JSON(), nullable=True))


def downgrade():
    op.drop_column('users', 'recent_mock')
    op.drop_column('users', 'resume_steps')
    op.drop_column('users', 'tasks')
    op.drop_column('users', 'practice_streak')
    op.drop_column('users', 'accuracy_percent')
    op.drop_column('users', 'problems_solved')
    op.drop_column('users', 'sql_progress')
    op.drop_column('users', 'python_progress')
    op.drop_column('users', 'react_progress')
    op.drop_column('users', 'js_progress')
    op.drop_column('users', 'dsa_progress')
    op.drop_column('users', 'web_dev_progress')
