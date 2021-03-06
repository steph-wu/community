class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :content
      t.integer :user_id
      t.integer :space_id
      t.integer :booking_id
      t.integer :rating

      t.timestamps
    end
  end
end
