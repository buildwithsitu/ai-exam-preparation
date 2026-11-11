"""add email otp challenges table

Revision ID: 0004_email_otp_challenges
Revises: 0003_password_hash
Create Date: 2026-11-11 20:30:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0004_email_otp_challenges'
down_revision = '0003_password_hash'
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    existing_tables = inspector.get_table_names()

    if 'email_otp_challenges' not in existing_tables:
        op.create_table(
            'email_otp_challenges',
            sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
            sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
            sa.Column('email', sa.String(length=120), nullable=False),
            sa.Column('otp_hash', sa.String(length=255), nullable=False),
            sa.Column('password_hash', sa.String(length=255), nullable=False),
            sa.Column('name', sa.String(length=100), nullable=False),
            sa.Column('institution', sa.String(length=150), nullable=True),
            sa.Column('track', sa.String(length=50), nullable=True),
            sa.Column('attempts', sa.Integer(), nullable=False, server_default='0'),
            sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
            sa.Column('last_sent_at', sa.DateTime(timezone=True), nullable=False),
            sa.Column('is_consumed', sa.Boolean(), nullable=False, server_default=sa.false()),
            sa.PrimaryKeyConstraint('id'),
        )
        op.create_index(
            op.f('ix_email_otp_challenges_email'),
            'email_otp_challenges',
            ['email'],
            unique=False,
        )


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    existing_tables = inspector.get_table_names()
    if 'email_otp_challenges' in existing_tables:
        op.drop_index(op.f('ix_email_otp_challenges_email'), table_name='email_otp_challenges')
        op.drop_table('email_otp_challenges')
