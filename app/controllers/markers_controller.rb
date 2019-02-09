require "awesome_map_marker"
class MarkersController < ApplicationController
  def show
    icon_type = params[:icon_type]
    icon_name = params[:id]
    color = "##{params[:color]}"
    image = AwesomeMapMarker.generate(type: :fas, name:"fa-#{icon_name}", fill_color: color)
    send_data image.to_blob, type: 'img/png'
  end

  def index

    render json: {icons: AwesomeMapMarker::FontAwesome.icons(:solid)}
  end
end
