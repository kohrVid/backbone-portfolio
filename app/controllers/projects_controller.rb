class ProjectsController < ApplicationController
  before_action :find_project, except: [:index, :create, :new]

  def index
    @user = User.find(params[:user_id])
    @projects = @user.projects
  end

  def create
    @project = Project.create(project_params)
    if @project.save
      redirect_to :root #"#users/#{@project.user_id}"
    end
  end

  def show
  end

  def update
    @project.update(project_params)
  end

  private

    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:title, :body, :repo_url, :image_url, :user_id)
    end
end
