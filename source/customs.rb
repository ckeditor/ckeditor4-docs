# Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
# For licensing, see LICENSE.html or http://ckeditor.com/license

require "jsduck/tag/tag"
require "jsduck/tag/boolean_tag"

# See https://github.com/senchalabs/jsduck/wiki/Custom-tags

module JsDuck::Tag
	class License < Ignore
		def initialize
			@tagname = :ignore
			@pattern = "license"
		end
	end

	class FileOverview < Ignore
		def initialize
			@tagname = :ignore
			@pattern = "fileOverview"
		end
	end

	class Todo < BooleanTag
		def initialize
			@tagname = :todo
			@pattern = "todo"
			@repeatable = true
		end
	end

	class See < Tag
		def initialize
			@tagname = :see
			@pattern = "see"
			@repeatable = true
		end
	end
end
