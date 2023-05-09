"""empty message

Revision ID: 1ccdc23f7906
Revises: cffd5e25971b
Create Date: 2023-05-03 09:40:25.150730

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '1ccdc23f7906'
down_revision = 'cffd5e25971b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lawyer_review')
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('receiver_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=False))
        batch_op.drop_constraint('review_company_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('review_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['receiver_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['author_id'], ['id'])
        batch_op.drop_column('user_id')
        batch_op.drop_column('company_user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('company_user_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('review_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key('review_company_user_id_fkey', 'user', ['company_user_id'], ['id'])
        batch_op.drop_column('author_id')
        batch_op.drop_column('receiver_id')

    op.create_table('lawyer_review',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('lawyer_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('rating', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('text', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('data_create', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['lawyer_id'], ['lawyer.id'], name='lawyer_review_lawyer_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='lawyer_review_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='lawyer_review_pkey')
    )
    # ### end Alembic commands ###