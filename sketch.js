//function preload() { startGibber() }

function setup() {
  createCanvas( windowWidth, windowHeight )

  drums = EDrums( 'x*o*x*o-' )
  
  sampler = Sampler().record( drums, 1 )
    .note.seq( [.25,.5,1,2].rnd(), [1/4,1/8,1/2].rnd() )
    .fx.add( Delay(1/64))
    .pan.seq( Rndf(-1,1) )

  bass = Mono('bass')
    .note.seq( [0,7], 1/8 )

  Gibber.scale.root.seq( ['c4','eb4'], 1 )
  
  follow = Follow( Gibber.Master, 1024 )
  
  background( 64 )
  noFill()
  stroke( 10,0,0,127 )
}

function draw() {
  
}