"""add password hash to users

Revision ID: 0003_password_hash
Revises: 0002_progress_fields
Create Date: 2026-11-10 20:30:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0003_password_hash'
down_revision = '0002_progress_fields'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('password_hash', sa.String(length=255), nullable=True))


def downgrade():
    op.drop_column('users', 'password_hash')
