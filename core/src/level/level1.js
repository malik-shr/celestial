import Checkpoint from "../element/checkpoint"
import JumpPad from "../element/jumpPad"
import MovingPlatform from "../element/movingPlatform"
import Player from "../element/player"
import SolidBlock from "../element/solidBlock"
import TemporaryBlock from "../element/temporaryBlock"
import Level from "./level"

// TODO add some elements to level1 and determine element logic

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min
}
