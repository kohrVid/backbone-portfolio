class CreateProjectSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :project_skills do |t|
      t.references :project, foreign_key: true, index: true
      t.references :skill, foregin_key: true, index: true

      t.timestamps
    end
  end
end
