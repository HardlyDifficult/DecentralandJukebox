import * as DCL from 'metaverse-api'

export default class SampleScene extends DCL.ScriptableScene {
  songs: {src: string, name: string}[] = 
  [
    {src: "sounds/Concerto a' 4 Violini No 2 - Telemann.mp3", name: "Telemann"},
    {src: "sounds/Double Violin Concerto 1st Movement - J.S. Bach.mp3", name: "Bach"},
    {src: "sounds/Rhapsody No. 2 in G Minor – Brahms.mp3", name: "Brahms"},
    {src: "sounds/Scherzo No1_ Chopin.mp3", name: "Chopin"},
  ];

  state: {buttonState: boolean[], lastSelectedState: number} = {
    buttonState: Array(this.songs.length).fill(false),
    lastSelectedState: 0,
  };
  
  async sceneDidMount() 
  {
    for(let i = 0; i < this.songs.length; i++)
    {
      this.eventSubscriber.on(`song${i}_click`, () => 
      {
        if(i != this.state.lastSelectedState)
        {
          this.state.buttonState[this.state.lastSelectedState] = false;
        }
        this.state.buttonState[i] = !this.state.buttonState[i];
        this.state.lastSelectedState = i;
        this.forceUpdate();
      });
    }
  }

  renderButtons() {
    return this.songs.map((song, index) =>
    {
      let x = index % 2 == 0 ? -.4 : .1;
      let y = Math.floor(index / 2) == 0 ? 1.9 : 1.77;
      let z = 0;
      if(this.state.buttonState[index])
      {
        z = .1;
      }
      return (
        <entity
            position={{x, y, z: -.7}}
        >
          <cylinder
            position={{x: 0, y: 0, z}}
            transition={{position: {duration: 100}}}
            id={"song" + index}
            rotation={{x: 90, y: 0, z: 0}}
            scale={{x: .05, y: .2, z: .05}}
            color="#990000"
            sound={{
              src:song.src, 
              playing:this.state.buttonState[index]}} />
          <text 
            hAlign="left"
            value={this.songs[index].name} 
            position={{x: .26, y: 0, z: -.1}}
            scale={.4}/>
        </entity>
      )
    }
    );
  }

  async render() {
    return (
      <scene>
        <gltf-model
          src="art/Jukebox.gltf"
          scale={.6}
          position={{x: 5, y: 0, z: 9.5}}>
          {this.renderButtons()}
        </gltf-model>
      </scene>
    )
  }
}
