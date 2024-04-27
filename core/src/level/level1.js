import Player from "../element/player";
import Level from "./level";

// TODO add some elements to level1 and determine element logic

export const level1 = new Level("1")

level1.elementList.add(new Player(100, 0, level1))