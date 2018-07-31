import * as DCL from 'metaverse-api'

export default class SampleScene extends DCL.ScriptableScene 
{
  songs: {src: string, name: string}[] = 
  [
    {src: "sounds/Concerto a' 4 Violini No 2 - Telemann.mp3", name: "Telemann"},
    {src: "sounds/Double Violin Concerto 1st Movement - J.S. Bach.mp3", name: "Bach"},
    {src: "sounds/Rhapsody No. 2 in G Minor – Brahms.mp3", name: "Brahms"},
    {src: "sounds/Scherzo No1_ Chopin.mp3", name: "Chopin"},
  ];

  state: {buttonState: boolean[], lastSelectedButton: number} = { 
    buttonState: Array(this.songs.length).fill(false),
    lastSelectedButton: 0,
  };

  sceneDidMount() 
  {
    for(let i = 0; i < this.songs.length; i++)
    {
      this.eventSubscriber.on(`song${i}_click`, () => 
      {
        let newButtonState = this.state.buttonState.slice();
        if(i != this.state.lastSelectedButton)
        {
          newButtonState[this.state.lastSelectedButton] = false;
        }
        newButtonState[i] = !this.state.buttonState[i];
        this.setState({
          buttonState: newButtonState,
          lastSelectedButton: i
        });
      });
    }
  }

  renderButtons() 
  {
    return this.songs.map((song, index) =>
    {
      let x = index % 2 == 0 ? -.4 : .1;
      let y = Math.floor(index / 2) == 0 ? 1.9 : 1.77;
      let buttonZ = 0;
      if(this.state.buttonState[index]) 
      {
        buttonZ = .1;
      }
      return (
        <entity
            position={{x, y, z: -.7}}
            sound={{ 
              src:song.src, 
              playing:this.state.buttonState[index]}}>
          <cylinder
            id={"song" + index}
            position={{x: 0, y: 0, z: buttonZ}} 
            transition={{position: {duration: 100}}} 
            rotation={{x: 90, y: 0, z: 0}}
            scale={{x: .05, y: .2, z: .05}}
            color="#990000" />
            <text 
              hAlign="left"
              value={this.songs[index].name} 
              position={{x: .26, y: 0, z: -.1}}
              scale={.4}/>
        </entity>
      )
    });
  }

  async render() 
  {
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