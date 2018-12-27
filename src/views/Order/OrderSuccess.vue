<template>
  <div>
      <canvas id='canvas_dom'></canvas>
      <div class="context">
          恭喜下单成功<br>
          下单金额为{{$route.query.amount}}元
          <p> <mu-button color="primary" @click="$router.push('/OrderDetail')">确定</mu-button></p>
      </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'App',
    data(){
      return {}
    },
    beforeCreate(){
    },
    mounted(){
        //初始化变量
        var canvas = document.getElementById('canvas_dom');
        var x=document.body.clientWidth
        var y=document.body.clientHeight
        canvas.width = x;
        canvas.height = y;
        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        //生成两个数之间的随机数
        function generate_random(min,max){
            return Math.floor(Math.random()*(max-min) +min);
        }


        /*************粒子爆炸效果*******************/
        //创建粒子
        function Particles(x,y,vx,vy,gravity,resistance,size,color){
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.gravity = gravity;
            this.resistance = resistance;
            this.size = size;
            this.color = color;
            this.alpha = 1;
            this.fade = 0;
            this.scale = Math.random() * 0.05 + 0.93;
        }


        //粒子原型
        var particle_fn = Particles.prototype;


        //判断粒子是否存在
        particle_fn.exist = function(){
            return this.size >= 1 && this.alpha >= 0.1;
        }


        //跟新粒子
        particle_fn.update = function(){
            this.vx *= this.resistance;
            this.vy *= this.resistance;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.fade;
            this.size *= this.scale;
        }


        //渲染粒子
        particle_fn.render = function(){
            if(!this.exist()){
                var index = particles.indexOf(this);
                particles.splice(index,1);
                return;
            }
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size/2,0,Math.PI*2,false);
            ctx.fill();
            ctx.restore();
        }


        //创建粒子
        var particles = [];


        //初始化粒子
        function init_particles(){
            var x = generate_random(50,canvas.width - 150);
            var y = generate_random(50,canvas.height - 150);
            var color = "rgb("+generate_random(0,255)+","+generate_random(0,255)+","+generate_random(0,255)+")";
            for(var i = 0;i < 100;i ++){
                var angle = Math.random()* Math.PI*2;
                var speed = Math.cos(Math.random() * Math.PI / 2) * 15;
                var vx = Math.cos(angle) * speed;
                var vy = Math.sin(angle) * speed;
                var gravity = 0.2;
                var resistance = 0.93;
                var size = 15;
                var particle = new Particles(x,y,vx,vy,gravity,resistance,size,color);
                particles.push(particle);
            }
        }


        //循环函数
        function particles_loop(){
            ctx.fillStyle = "rgba(0,0,0,0.05)";
            ctx.fillRect(0, 0,canvas.width,canvas.height);
            if(particles.length === 0){
                init_particles();
            }
            for(var i = 0;i < particles.length;i ++){
                var particle = particles[i];
                particle.render();
                particle.update();
            }
            requestAnimationFrame(particles_loop);
        }
        particles_loop();
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";
  div.context{
      position:absolute;
      color:#fff;
      width:100%;
      text-align: center;
      top:px2rem(500px);
  }
</style>
