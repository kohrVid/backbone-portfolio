json.array! @projects do |project|
  json.id project.id
  json.title project.title
  json.body project.body
  json.repoUrl project.repo_url
  json.projectImageUrl project.image_url
  json.userId project.user_id
end

