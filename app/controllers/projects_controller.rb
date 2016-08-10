class ProjectsController < ApplicationController
  def index
    sleep(3)
    @projects = Project.all
  end

  def create
   # respond_to do |format|
    #  format.json {
	@project = Project.create(project_params)
 #     }
 #   end
=begin
    if @project.save
      render {action: :show}
    end
=end
  end

  def show
    @project = Project.find(params[:id])
  end

  private

  def project_params
    params.require(:project).permit(:title, :body, :repo_url, :image_url, :user_id)
  end
end
