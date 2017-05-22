###
# Page options, layouts, aliases and proxies
###
activate :sprockets do |c|
  c.expose_middleman_helpers = true
endpose_middleman_helpers = true
end

activate :blog do |blog|
  blog.name = 'blog'
  blog.prefix = 'blog'
  blog.layout = 'blog'
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.permalink = "{category}/{title}.html"
end

activate :blog do |blog|
  blog.name = 'press'
  blog.prefix = 'press'
  blog.layout = 'press'
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.permalink = "{category}/{title}.html"
end

activate :blog do |blog|
  blog.name = 'leadership-developments'
  blog.prefix = 'leadership-developments'
  blog.layout = 'leadership_development_insights_current'
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.permalink = "{title}.html"
end

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

redirect "press/test/Cornerstone-Management-Resource-Systems-promotes-Carl-Thoresen,-Ph.D.,-to-President.html",
  to: "press/press-releases/Cornerstone-Management-Resource-Systems-promotes-Carl-Thoresen,-Ph.D.,-to-President.html"

set :fonts_dir,  "fonts"

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

sprockets.append_path File.join root, 'node_modules'

activate :relative_assets
set :relative_links, true

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
