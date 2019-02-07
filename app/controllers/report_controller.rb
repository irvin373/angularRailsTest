class ReportController < ApplicationController
  layout 'report'
  def report_day
      @idPharmacy = current_user.role.pharmacy.id
      @idUser = current_user.id
      @idRol = current_user.role_id
      date = params[:date]
      @fecha = Date.parse(date)

      if @idRol == 2
        @sells = Sell.where(pharmacy_id:@idPharmacy,date_sell: Date.parse(date))
      elsif @idRol == 1
        @sells = Sell.where(user_id:@idUser,pharmacy_id:@idPharmacy,date_sell: Date.parse(date))
      end

      respond_to do |format|
          format.html
          format.pdf do 
              html = render_to_string(layout: false, action:"report_day.html.erb")
              kit = PDFKit.new(html, page_size:'A4', print_media_type:true)
              kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/bootstrap.css"
              pdf = kit.to_pdf
              send_data pdf, filename: 'reporte_ventas_dia.pdf', type: 'application/pdf', disposition: 'inline'
          end
      end
  end

  def report_mounth
    @idPharmacy = current_user.role.pharmacy.id
    date_ini = Date.parse(params[:date]) 
    date_end = date_ini.end_of_month
    @fecha = date_ini
    @idUser = current_user.id
    @idRol = current_user.role_id

    if @idRol == 2
      @sells = Sell.where(pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    elsif @idRol == 1
      @sells = Sell.where(user_id: @idUser,pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    end

    respond_to do |format|
      format.html
      format.pdf do 
          html = render_to_string(layout: false, action:"report_mounth.html.erb")
          kit = PDFKit.new(html, page_size:'A4', print_media_type:true)
          kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/bootstrap.css"
          pdf = kit.to_pdf
          send_data pdf, filename: 'reporte_ventas_mes.pdf', type: 'application/pdf', disposition: 'inline'
      end
    end
  end


  def report_dates
    @idPharmacy = current_user.role.pharmacy.id
    date_ini = Date.parse(params[:date1])
    puts date_ini
    date_end = Date.parse(params[:date2])
    puts date_end
    @fecha_ini = date_ini
    @fecha_end = date_end
    @idUser = current_user.id
    @idRol = current_user.role_id

    if @idRol == 2
      @sells = Sell.where(pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    elsif @idRol == 1
      @sells = Sell.where(user_id: @idUser,pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    end

    respond_to do |format|
      format.html
      format.pdf do 
          html = render_to_string(layout: false, action:"report_dates.html.erb")
          kit = PDFKit.new(html, page_size:'A4', print_media_type:true)
          kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/bootstrap.css"
          pdf = kit.to_pdf
          send_data pdf, filename: 'reporte_ventas_dias.pdf', type: 'application/pdf', disposition: 'inline'
      end
    end
    end

end
