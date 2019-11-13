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

    @links_block = "<p><a href=\"#{links[0]}\" target='_blank' download='true'>#{links[0]}</a></p>"

    data = {
      template_id: 'country-batch-download',
      substitution_data: {
        country: @contact.country,
        dynamic_html: {
          links_block: @links_block
        },
      }
    }

    mail(to: @contact.email,
         sparkpost_data: data)
  end

  def message_mail(message)
    @contact = message
    sub_data = {
      first_name: message.first_name,
      last_name: message.last_name
      email: message.email,
      title: message.title,
      company: message.company,
      country: message.country,
      message: message.message
    }
    data = { template_id: 'message', substitution_data: sub_data }
    mail(to: ENV.fetch('I2I_MAIL'), cc: ['david.inga+i2i@vizzuality.com', 'clara.linos+i2i@vizzuality.com'], sparkpost_data: data)
  end
end
