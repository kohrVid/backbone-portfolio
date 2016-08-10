class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :repo_url
      t.string :image_url
      t.text :body
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
