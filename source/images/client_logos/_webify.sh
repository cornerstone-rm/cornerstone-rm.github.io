# Use a simple shell loop, to process each of the images.
mkdir web
find * -prune -name '*.png' \
       -exec  convert '{}' -resize x120 web/web_'{}' \;

# Use find to substitute filenames into a 'convert' command.
# This also provides the ability to recurse though directories by removing
# the -prune option, as well as doing other file checks (like image type,
# or the disk space used by an image).
