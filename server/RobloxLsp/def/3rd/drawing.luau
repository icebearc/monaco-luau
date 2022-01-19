export type Drawing.Font = number

export type Drawing.Line = {
	Thickness: number,
	From: Vector2,
	To: Vector2,
}>

export type Drawing.Text = Drawing & {
	Text: string,
	Size: number,
	Center: boolean,
	Outline: bool,
	OutlineColor: Color3,
	Position: Vector2,
	TextBounds: Vector2,
	Font: Drawing.Font,
}

export type Drawing.Image = Drawing & {
	Data: string,
	Size: Vector2,
	Position: Vector2,
	Rounding: number,
}

export type Drawing.Circle = Drawing & {
	Thickness: number,
	NumSides: number,
	Radius: number,
	Filled: boolean,
	Position: Vector2,
}

export type Drawing.Square = Drawing & {
	Thickness: number,
	Size: Vector2,
	Position: Vector2,
	Filled: boolean,
}

export type Drawing.Quad = Drawing & {
	Thickness: number,
	PointA: Vector2,
	PointB: Vector2,
	PointC: Vector2,
	PointD: Vector2,
	Filled: boolean,
}

export type Drawing.Triangle = Drawing & {
	Thickness: number,
	PointA: Vector2,
	PointB: Vector2,
	PointC: Vector2,
	Filled: boolean,
}

export type Drawing = {
	Visible: boolean,
	ZIndex: number,
	Transparency: number,
	Color: Color3,
	Remove: (self: Drawing) -> (),
}
