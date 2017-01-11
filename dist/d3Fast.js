// d3Pie.js
d3.Pie = function(obj){
		this.width = obj.width || 300;
		this.height = obj.height || 300;
		this.className = obj.className || "";
		this.dataset = obj.dataset || [ 100,100,50 ];
		this.innerRadius = obj.innerRadius || 0;
		this.id = obj.id || "";
		this.parent = obj.parent || "body";
		this.percentage = obj.percentage || false;
		this.interval = obj.interval || 0;
		this.fontSize = obj.fontSize || 10;
		this.hasText = obj.hasText || true;
		this.fontColor = obj.fontColor || "#333";
		this.update = function(dataset){
			var dataset = dataset || this.dataset;
			piedata = pie(dataset);
			var newarcs = arcs.data(piedata)

				newarcs
				  .each(function(d){
					d.startAngle += _self.interval;
					d.endAngle -= _self.interval;
				  })
				  .exit()
				  .remove()
				  

				newarcs.select("path")
				

				.attr("fill",function(d,i){
					this.color = color(i);
					return color(i)
				})
				.attr("d",function(d){
			        return arc(d);   //调用弧生成器，得到路径值
			    })

				if(_self.hasText){
					newarcs.select("text")
					.attr("transform",function(d){
				        return "translate(" + arc.centroid(d) + ")";
				    })
				    .attr("text-anchor","middle")
				    .text(function(d){
				        if(_self.percentage){
				    		var percent = Number(d.value)/d3.sum(piedata,function(d){ return d.data; }) * 100;
							//保留1位小数点，末尾加一个百分号返回
							return percent.toFixed(1) + "%";
				    	}else{
				        	return d.value;
				    	}
				    });
				}
		}
		var _self = this;
		var svg = d3.select(_self.parent)
					.append("svg")
					.attr("id", _self.id)
					.attr("class",_self.className)
					.attr("viewBox","0 0 "+_self.width+" "+_self.height+"")

		var dataset = _self.dataset;
		var pie = d3.layout.pie();
		var piedata = pie(dataset);

		var color = d3.scale.category10();   //有十种颜色的颜色比例尺

		var outerRadius = _self.width/2; //外半径
		var innerRadius = _self.innerRadius; //内半径，为0则中间没有空白
		 
		var arc = d3.svg.arc()  //弧生成器
		    .innerRadius(innerRadius)   //设置内半径
		    .outerRadius(outerRadius);  //设置外半径

		var arcs = svg.selectAll("g")
			.data(piedata)
			.enter()
			.append("g")
			.each(function(d){
				d.startAngle += _self.interval;
				d.endAngle -= _self.interval;
			})
			.attr("transform","translate("+(_self.width/2)+","+(_self.width/2)+")")

		arcs.append("path")
			.attr("fill",function(d,i){
				this.color = color(i);
				return color(i)
			})
			.attr("d",function(d){
		        return arc(d);   //调用弧生成器，得到路径值
		    })
		if(_self.hasText){
			arcs.append("text")
		    .attr("transform",function(d){
		        return "translate(" + arc.centroid(d) + ")";
		    })
		    .attr("style","font-size:"+_self.fontSize)
		    .attr("fill",_self.fontColor)
		    .attr("text-anchor","middle")
		    .text(function(d){
		    	if(_self.percentage){
		    		var percent = Number(d.value)/d3.sum(piedata,function(d){ return d.data; }) * 100;
					//保留1位小数点，末尾加一个百分号返回
					return percent.toFixed(1) + "%";
		    	}else{
		        	return d.value;
		    	}
		    });
		}
		
	}