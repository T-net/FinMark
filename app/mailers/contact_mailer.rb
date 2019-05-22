class ContactMailer < ApplicationMailer

  def data_mail(contact)
    @contact = contact

    sub_data = { country: @contact.country,
                 year: @contact.year }

    data = { template_id: 'country-data',
             substitution_data: sub_data }

    mail(to: @contact.email,
         sparkpost_data: data)
  end

  def data_batch_download(contact, links)
    @contact = contact
    
    @links_block = ""
    links.each do |link|
      @links_block << "<p><a href=\"#{link}\" target='_blank' download='true'>#{link}</a></p><br>"
    end
    
    data = {
      template_id: 'country-batch-download',
      substitution_data: { country: @contact.country },
      dynamic_html: {
        links_block: @links_block
      }
    }
  
    mail(to: @contact.email,
         sparkpost_data: data)
  end

  def message_mail(message)
    data = { template_id: 'message', substitution_data: message }
    mail(to: ENV.fetch('I2I_MAIL'), sparkpost_data: data)
  end
end
