class HomeController < ApplicationController
  def index
  end

  def about
  end

  def news
  end

  def contact
  end

  def send_email
    @email = params[:email]
    @message = params[:message]
    
    #se puede implementar el envío de correo usando Action Mailer
    #Por ahora, simplemente redirigimos con un mensaje de éxito
    
    redirect_to contact_path, notice: "Thank you for your message, we will contact you soon."
  end
  
  def fetch_news
    require 'net/http'
    require 'json'
    
    api_key = '85f94c52bc0e4f3c81b7168f8c21d4f1' 
    category = params[:category] || 'technology'
    
    url = URI("https://newsapi.org/v2/top-headlines?category=#{category}&apiKey=#{api_key}")
    
    begin
      response = Net::HTTP.get_response(url)
      news_data = JSON.parse(response.body)
      
      render json: news_data
    rescue => e
      render json: { error: e.message }, status: 500
    end
  end
end
