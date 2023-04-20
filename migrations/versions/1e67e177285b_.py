"""empty message

Revision ID: 1e67e177285b
Revises: d77f05d8e803
Create Date: 2023-04-20 09:41:35.019969

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e67e177285b'
down_revision = 'd77f05d8e803'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.alter_column('cif',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)

    with op.batch_alter_table('lawyer', schema=None) as batch_op:
        batch_op.drop_constraint('lawyer_email_key', type_='unique')
        batch_op.drop_column('email')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=100),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=100),
               nullable=False)

    with op.batch_alter_table('lawyer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.VARCHAR(length=250), autoincrement=False, nullable=False))
        batch_op.create_unique_constraint('lawyer_email_key', ['email'])

    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.alter_column('cif',
               existing_type=sa.String(length=10),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
