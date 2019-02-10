require 'open-uri'

module WebPackerBundleHelper
  class BundleNotFound < StandardError; end

  def javascript_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.js")
    options = {
        src: path,
        defer: true
    }.merge(options)
    options.delete(:defer) if options[:async]
    javascript_include_tag '', **options
  end

  def stylesheet_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.css")
    options = {
        href: path
    }.merge(options)
    stylesheet_link_tag '', **options
  end

  def asset_bundle_path(entry, **options)
    valid_entry?(entry)
    asset_path("#{asset_server}" + manifest.fetch(entry), **options)
  end


  private

  # Asset Sever URL
  def asset_server
    port = Rails.env === 'production' ? '3000' : '8000'
    "http://#{request.host}:#{port}/"
  end

  def pro_manifest
    File.read('public/manifest.json')
  end

  def dev_manifest
    OpenURI.open_uri("#{asset_server}/manifest.json").read
  end

  def test_manifest
    File.read('public/packs-test/manifest.json')
  end

  def manifest
    return @manifest ||= JSON.parse(pro_manifest) if Rails.env.production?
    return @manifest ||= JSON.parse(dev_manifest) if Rails.env.development?
    return @manifest ||= JSON.parse(test_manifest)
  end

  def valid_entry?(entry)
    return true if manifest.key?(entry)
    raise BundleNotFound, "Could not find bundle with name #{entry}"
  end

end