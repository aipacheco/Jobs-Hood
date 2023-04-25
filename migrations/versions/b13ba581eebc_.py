"""empty message

Revision ID: b13ba581eebc
Revises: 454ed134bf80
Create Date: 2023-04-25 11:58:58.013168

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b13ba581eebc'
down_revision = '454ed134bf80'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('company_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('lawyer_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'company', ['company_id'], ['id'])
        batch_op.create_foreign_key(None, 'lawyer', ['lawyer_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('lawyer_id')
        batch_op.drop_column('company_id')

    # ### end Alembic commands ###
