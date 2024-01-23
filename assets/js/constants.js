const ASPECT_RATIO = 4 / 3; //The aspect ratio should not be modified

const FPS = 1000 / 60;

const CANVAS_W = 500;

const RF = CANVAS_W / 500; //The Resize Factor (RF) should not be modified

const KEY_RIGHT = 39; //KEY Arrow Right
const KEY_LEFT = 37; //KEY Arrow Left
const KEY_JUMP_1 = 38; //KEY Arrow Up
const KEY_JUMP_2 = 65; //KEY A
const KEY_CROUCH = 40; //KET Arrow Down
const KEY_SHOOT_1 = 32; //KEY Space
const KEY_SHOOT_2 = 83; //KEY S
//KEY_Q = 81;

const BACKGROUND_WIDTH = 5000 * RF;
const BACKGROUND_HEIGHT = 750 * RF;
const BACKGROUND_SPEED = 4 * RF;

const MARIO_WIDTH = 55 * RF;
const MARIO_HEIGHT = 69 * RF;
const MARIO_X_PADDING = 120 * RF;
const MARIO_GROUND_PADDING = 119 * RF;
const MARIO_SPEED_MOVE = 6 * RF;
const MARIO_SPEED_JUMP = 10 * RF;
const MARIO_ACCELERATION = 0.5 * RF;
const MARIO_RUN_ANIMATION_TICK = 7;
const MARIO_CROUCH_H_REDUCE = 2 * RF;
const MARIO_BULLET_BACK_OFF = 300;
const MARIO_X_MOVE_BG_LEFT = 200 * RF;
const MARIO_X_MOVE_BG_RIGHT = 150 * RF;

const BULLET_WIDTH = 22 * RF;
const BULLET_HEIGHT = 17 * RF;
const BULLET_SPEED = 8 * RF;
const BULLET_MOVE_ANIMATION_TICK = 3;
const BULLET_GRAVITY = 6 * RF;
const BULLET_BOUNCE_HEIGHT = 300 * RF;

const BLOCK_WIDTH = 32 * RF;
const BLOCK_HEIGHT = 32 * RF;

const BLOCK_ITEM_WIDTH = 37 * RF;
const BLOCK_ITEM_HEIGHT = 32 * RF;
const BLOCK_ITEM_ANIMATION_TICK = 11;

const COIN_WIDTH = 67 * (1 / 3) * RF;
const COIN_HEIGHT = 64 * (1 / 3) * RF;
const COIN_ANIMATION_TICK = 6;