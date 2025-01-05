class AddUserToPosts < ActiveRecord::Migration[8.0]
  def change
    add_reference :posts, :user, null: true, foreign_key: true

    reversible do |dir|
      dir.up do
        # Update existing posts with a valid user ID
        Post.update_all(user_id: User.first&.id || 1)
      end
    end

    # Enforce NOT NULL constraint
    change_column_null :posts, :user_id, false
  end
end
