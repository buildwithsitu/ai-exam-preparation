"""create initial users table

Revision ID: 0001_initial_users
Revises: 
Create Date: 2026-11-10 19:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_initial_users'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=120), nullable=False),
        sa.Column('institution', sa.String(length=150), nullable=False),
        sa.Column('track', sa.String(length=50), nullable=False),
        sa.Column('overall_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('practice_done', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('projects_built', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('streak_days', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)


def downgrade():
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
