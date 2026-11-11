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
    columns = [
        sa.Column('web_dev_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('dsa_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('js_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('react_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('python_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('sql_progress', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('problems_solved', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('accuracy_percent', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('practice_streak', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('tasks', sa.JSON(), nullable=True),
        sa.Column('resume_steps', sa.JSON(), nullable=True),
        sa.Column('recent_mock', sa.JSON(), nullable=True),
    ]
    existing_columns = {
        column['name'] for column in sa.inspect(op.get_bind()).get_columns('users')
    }
    for column in columns:
        if column.name not in existing_columns:
            op.add_column('users', column)


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
