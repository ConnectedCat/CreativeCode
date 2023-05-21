class Drop {
	constructor(_x, _y) {
		this.pos = createVector(_x, _y)
		this.radius = [0]
		this.trigger = true
		this.timer = 0
		this.opacity = 1
	}

	update() {		
		for(let i = 0; i < this.radius.length; i++){
			this.radius[i] += 0.4
		}
		this.opacity = this.radius[0]*-0.01 + 1
		//console.log(this.opacity)
		
		if((this.timer*-0.003 + 1) > random()){
			let cyclePosition = sin(this.timer*0.1)
			
			if(cyclePosition > 0.9 && this.trigger){
				this.radius.push(0)
				this.trigger = false
			}
			if(cyclePosition < 0){
				this.trigger = true
			}
		}
		this.timer++
		
		//console.log((this.timer*-0.003 + 1) > random())
	}

	display() {
		this.radius.forEach((r) => {
			stroke(255, this.opacity)
			noFill()
			ellipse(this.pos.x, this.pos.y, r * 2, r)
		})
		if((this.timer*-0.03 + 1) > random()){
			let randomX = random(width)
			let randomY = random(height)
			let randomL = random(10, 40)
			line(randomX, randomY, randomX, randomY+randomL);
		}
	}
}