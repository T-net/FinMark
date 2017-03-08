ActiveAdmin.register News do

  config.per_page = 20
  config.sort_order = 'id_asc'

  filter :title

  controller do
    defaults :route_collection_name => 'news_index', :route_instance_name => 'news'
    def permitted_params
      params.permit news: [:title, :author, :summary, :content, :id, :image, :date, :highlight]
    end
  end

  index do
    selectable_column
    column :title do |news|
      link_to news.title, admin_news_path(news)
    end
    column :summary
    column :updated_at
    actions
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'News details' do
      f.input :highlight
      f.input :author
      f.input :title
      f.input :summary
      f.input :content, as: :ckeditor, input_html: { ckeditor: { height: 400 } }
      f.input :date, as: :date_picker
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end


  show do |ad|
    attributes_table do
      row :date
      row :title
      row :author
      row :summary
      row :content
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
      # Will display the image on show object page
    end
  end
end
