local HttpService = game:GetService("HttpService")

local Connected = false
local Settings = {
	port = 27844,
	startAutomatically = true,
	exclude = {
		-- game:GetService("Workspace")
	}
}

local function AddChild(instance, parent, depth)
	for _, exclude in pairs(Settings.exclude) do
		if instance == exclude then
			return
		end
	end
	local child = {
		Name = instance.Name,
		ClassName = instance.ClassName
	}
	parent[#parent+1] = child
	if depth < 14 then
		local children = instance:GetChildren()
		if #children ~= 0 then
			child.Children = {}
			for _, child2 in pairs(children) do
				AddChild(child2, child.Children, depth + 1)
			end
		end
	end
end

local LastUpdate = nil
local ShouldUpdate = false

local Services = {
	game:GetService("Workspace"),
	game:GetService("Players"),
	game:GetService("Lighting"),
	game:GetService("ReplicatedFirst"),
	game:GetService("ReplicatedStorage"),
	game:GetService("ServerScriptService"),
	game:GetService("ServerStorage"),
	game:GetService("StarterGui"),
	game:GetService("StarterPack"),
	game:GetService("StarterPlayer"),
	game:GetService("SoundService"),
	game:GetService("Chat"),
	game:GetService("LocalizationService"),
	game:GetService("TestService")
}

local function utf8Len(str, start, finish)
	local len = 0
	for _ = 1, 10000 do
		local clen, pos = utf8.len(str, start, finish, true)
		if clen then
			len = len + clen
			break
		else
			len = len + 1 + utf8.len(str, start, pos - 1, true)
			start = pos + 1
		end
	end
	return len
end

local Failed = false

local function Update(force)
    if not Connected or not Settings then
        return
	end
    local tree = {Children = {}}
	for _, service in pairs(Services) do
		AddChild(service, tree.Children, 1)
	end
	local datamodel = HttpService:JSONEncode(tree)
	if utf8Len(datamodel, 1, -1) >= 2.8e+6 and not Failed then
		Failed = true
		warn("[Roblox LSP] Failed to send data: Size of the Instance Tree is greater than 3mb, exclude instances in the plugin settings.")
		return
	end
	Failed = false
    if not force and datamodel == LastUpdate then
        return
	end
	LastUpdate = datamodel
	local success, ret = pcall(function()
		return request({
			Url = "http://127.0.0.1:" .. Settings.port .. "/update/",
			Method = 'POST',
			Headers = {
				["Content-Type"] = "application/json",
			},
			Body = HttpService:JSONEncode({
				DataModel = tree,
				Version = 2
			}),
		})	
	end)
    print(ret.StatusCode)
	if not success then
		warn("[Roblox LSP] Failed to connect: " .. tostring(ret))
		warn("Make sure the VSCode Extension is running and hosting: http://127.0.0.1:" .. Settings.port)
	end
end

local function IsOnPath(instance)
    if not Settings then
        return
	end
	local _, ret = pcall(function()
		for _, exclude in pairs(Settings.exclude) do
			if typeof(exclude) ~= "Instance" then
				warn("[Roblox LSP] " .. tostring(exclude) .. " is not an Instance")
				continue
			end
			if instance:IsDescendantOf(exclude) then
				return false
			end
		end
		for _, service in pairs(Services) do
			if instance:IsDescendantOf(service) then
				return true
			end
		end
	end)
    return ret or false
end

if Settings and Settings.startAutomatically then
	Connected = true
	print("[Roblox LSP] Connecting")
	Update()
end

local function ListenToChanges(instance)
	instance:GetPropertyChangedSignal("Name"):Connect(function()
		if Connected then
			ShouldUpdate = true
		end
	end)
	instance.AncestryChanged:Connect(function()
		if not instance.Parent then
			return
		end
		if Connected then
			ShouldUpdate = true
		end
	end)
end

game.DescendantAdded:Connect(function(descendant)
    if not Connected then
        return
    end
	if IsOnPath(descendant) then
        pcall(ListenToChanges, descendant)
		ShouldUpdate = true
    end
end)

game.DescendantRemoving:Connect(function(descendant)
    if not Connected then
        return
    end
	if IsOnPath(descendant) then
		ShouldUpdate = true
    end
end)

if Settings then
    for _, service in pairs(Services) do
		for _, descendant in pairs(service:GetDescendants()) do
            if IsOnPath(descendant) then
                pcall(ListenToChanges, descendant)
            end
        end
    end
end

while wait(0.5) do
	if Connected then
		if ShouldUpdate then
			ShouldUpdate = false
			Update()
		end
		wait(0.5)
		pcall(function()
			local last = game:HttpGetAsync("http://127.0.0.1:" .. Settings.port .. "/last/")
			if last == "" then
				wait(3)
				print("[Roblox LSP] Reconnecting")
				Update(true)
			end
		end)
	end
end