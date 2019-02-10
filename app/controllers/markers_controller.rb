require "awesome_map_marker"
class MarkersController < ApplicationController
  def show

    icon_type = params[:icon_type]
    icon_name = params[:id]
    color = "##{params[:color]}"

    # cache control
    expires_in 6.months

    if cache_exists?
      send_file cache_path, file_name: file_name, type: 'img/png'
    else
      # icon generate
      image = AwesomeMapMarker.generate type: icon_type, name:"fa-#{icon_name}", fill_color: color
      save_cache image.to_blob
      send_data image.to_blob, file_name: file_name, type: 'img/png'
    end
  end

  def index
    # icon list
    render json: {icons: {
        solid:AwesomeMapMarker::FontAwesome.icons(:fas),
        brand:AwesomeMapMarker::FontAwesome.icons(:fab)
    }}
  end

  private

  def cache_dir
    dir = File.join(Rails.root,'tmp','cache')
    unless File.exist? dir
      FileUtils.mkdir dir
    end
    dir = File.join(Rails.root,'tmp','cache','icon')
    unless File.exist? dir
      FileUtils.mkdir dir
    end
    file_name
    return dir
  end

  def cache_path
    File.join(cache_dir,file_name)
  end

  def file_name
    "ico#{request.path.gsub('/','-')}"
  end

  def cache_exists?
    File.exist?(cache_path)
  end

  def save_cache(image)
    File.open(cache_path,"wb") do |file|
      file.write image
    end
  end
end
