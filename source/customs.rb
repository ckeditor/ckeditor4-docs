# Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
# For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license

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

	class SkipSource < Tag
		def initialize
			@tagname = :skipSource
			@pattern = "skipsource"
			@repeatable = true
		end

		def parse_doc(p, pos)
			{
				:tagname => :skipSource
			}
		end

		def process_doc(h, tags, pos)
			h[:skipSource] = true
		end
	end
end
