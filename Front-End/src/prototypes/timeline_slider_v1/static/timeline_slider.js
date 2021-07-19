import { Slider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

// 'use strict';

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return (
//       <button onClick={() => this.setState({ liked: true })}>
//         Like
//       </button>
//     );
//   }
// }

const element = <Slider/>;

const domContainer = document.getElementById('root');
ReactDOM.render(element, domContainer);
