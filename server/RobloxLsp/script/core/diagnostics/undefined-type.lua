local files = require 'files'
local guide = require 'core.guide'
local lang  = require 'language'
local rbxlibs = require 'library.rbxlibs'
local vm = require 'vm'

return function (uri, callback)
    local ast   = files.getAst(uri)
    if not ast then
        return
    end
    guide.eachSourceType(ast.ast, "type.name", function (source)
        if source[1] == "" then
            return
        end
        if source.parent.type ~= "type.module" and rbxlibs.object[source[1]] then
            if source.generics then
                callback {
                    start = source.generics.start,
                    finish = source.generics.finish,
                    message = lang.script('TYPE_GENERIC_COUNT', 0, #source.generics)
                }
            end
            return
        end
        local typeAlias = source.typeAliasGeneric or vm.getTypeAlias(source)
        if typeAlias then
            local genericCount = 0
            if typeAlias.generics then
                genericCount = #typeAlias.generics
            end
            if source.generics then
                if #source.generics ~= genericCount then
                    callback {
                        start = source.generics.start,
                        finish = source.generics.finish,
                        message = lang.script('TYPE_GENERIC_COUNT', genericCount, #source.generics)
                    }
                end
            elseif genericCount > 0 then
                callback {
                    start = source.start,
                    finish = source.finish,
                    message = lang.script('TYPE_GENERIC_COUNT', genericCount, "none")
                }
            end
        else
            callback {
                start = source.start,
                finish = source.finish,
                message = lang.script('TYPE_UNDEFINED', source[1])
            }
        end
    end)
end