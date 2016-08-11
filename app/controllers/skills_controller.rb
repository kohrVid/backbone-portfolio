class SkillsController < ApplicationController
  before_action :find_skill, except: [:index, :create, :new]

  def index
    @skills = Skill.all
  end

  def create
    @skill = Skill.create(skill_params)
    if @skill.save
      redirect_to :root
    end
  end

  def show
  end

  def update
    @skill.update(skill_params)
  end

  private

    def find_skill
      @skill = Skill.find(params[:id])
    end

    def skill_params
      params.require(:skill).permit(:name)
    end
end
