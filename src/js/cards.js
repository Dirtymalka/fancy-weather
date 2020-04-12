const cards = [
  {
    id: 1,
    name: 'Action (set A)',
    img: '/img/dance.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'cry',
        translation: 'плакать',
        image: 'img/cry.jpg',
        audioSrc: 'https://wooordhunt.ru//data/sound/word/us/mp3/cry.mp3',
        parentId: 1
      },
      {
        id: 2,
        word: 'dance',
        translation: 'танцевать',
        image: 'img/dance.jpg',
        audioSrc: 'https://wooordhunt.ru//data/sound/word/us/mp3/dance.mp3',
        parentId: 1
      },
      {
        id: 3,
        word: 'dive',
        translation: 'нырять',
        image: 'img/dive.jpg',
        audioSrc: 'https://wooordhunt.ru//data/sound/word/us/mp3/dive.mp3',
        parentId: 1
      },
      {
        id: 4,
        word: 'draw',
        translation: 'рисовать',
        image: 'img/draw.jpg',
        audioSrc: 'https://wooordhunt.ru//data/sound/word/us/mp3/draw.mp3',
        parentId: 1
      },
      {
        id: 5,
        word: 'fish',
        translation: 'ловить рыбу',
        image: 'img/fish.jpg',
        audioSrc: 'audio/fish.mp3',
        parentId: 1
      },
      {
        id: 6,
        word: 'fly',
        translation: 'летать',
        image: 'img/fly.jpg',
        audioSrc: 'https://wooordhunt.ru//data/sound/word/us/mp3/fish.mp3',
        parentId: 1
      },
      {
        id: 7,
        word: 'hug',
        translation: 'обнимать',
        image: 'img/hug.jpg',
        audioSrc: 'audio/hug.mp3',
        parentId: 1
      },
      {
        id: 8,
        word: 'jump',
        translation: 'прыгать',
        image: 'img/jump.jpg',
        audioSrc: 'audio/jump.mp3',
        parentId: 1
      }
    ]
  },
  {
    id: 2,
    name: 'Action (set B)',
    img: '/img/run.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'open',
        translation: 'открывать',
        image: 'img/open.jpg',
        audioSrc: 'audio/open.mp3',
        parentId: 2
      },
      {
        id: 2,
        word: 'play',
        translation: 'играть',
        image: 'img/play.jpg',
        audioSrc: 'audio/play.mp3',
        parentId: 2
      },
      {
        id: 3,
        word: 'point',
        translation: 'указывать',
        image: 'img/point.jpg',
        audioSrc: 'audio/point.mp3',
        parentId: 2
      },
      {
        id: 4,
        word: 'ride',
        translation: 'ездить',
        image: 'img/ride.jpg',
        audioSrc: 'audio/ride.mp3',
        parentId: 2
      },
      {
        id: 5,
        word: 'run',
        translation: 'бегать',
        image: 'img/run.jpg',
        audioSrc: 'audio/run.mp3',
        parentId: 2
      },
      {
        id: 6,
        word: 'sing',
        translation: 'петь',
        image: 'img/sing.jpg',
        audioSrc: 'audio/sing.mp3',
        parentId: 2
      },
      {
        id: 7,
        word: 'skip',
        translation: 'пропускать, прыгать',
        image: 'img/skip.jpg',
        audioSrc: 'audio/skip.mp3',
        parentId: 2
      },
      {
        id: 8,
        word: 'swim',
        translation: 'плавать',
        image: 'img/swim.jpg',
        audioSrc: 'audio/swim.mp3',
        parentId: 2
      }
    ]
  },
  {
    id: 3,
    name: 'Action (set C)',
    img: '/img/drop.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'argue',
        translation: 'спорить',
        image: 'img/argue.jpg',
        audioSrc: 'audio/argue.mp3',
        parentId: 3
      },
      {
        id: 2,
        word: 'build',
        translation: 'строить',
        image: 'img/build.jpg',
        audioSrc: 'audio/build.mp3',
        parentId: 3
      },
      {
        id: 3,
        word: 'carry',
        translation: 'нести',
        image: 'img/carry.jpg',
        audioSrc: 'audio/carry.mp3',
        parentId: 3
      },
      {
        id: 4,
        word: 'catch',
        translation: 'ловить',
        image: 'img/catch.jpg',
        audioSrc: 'audio/catch.mp3',
        parentId: 3
      },
      {
        id: 5,
        word: 'drive',
        translation: 'водить машину',
        image: 'img/drive.jpg',
        audioSrc: 'audio/drive.mp3',
        parentId: 3
      },
      {
        id: 6,
        word: 'drop',
        translation: 'падать',
        image: 'img/drop.jpg',
        audioSrc: 'audio/drop.mp3',
        parentId: 3
      },
      {
        id: 7,
        word: 'pull',
        translation: 'тянуть',
        image: 'img/pull.jpg',
        audioSrc: 'audio/pull.mp3',
        parentId: 3
      },
      {
        id: 8,
        word: 'push',
        translation: 'толкать',
        image: 'img/push.jpg',
        audioSrc: 'audio/push.mp3',
        parentId: 3
      }
    ]
  },
  {
    id: 4,
    name: 'Adjective',
    img: '/img/friendly.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'big',
        translation: 'большой',
        image: 'img/big.jpg',
        audioSrc: 'audio/big.mp3',
        parentId: 4
      },
      {
        id: 2,
        word: 'small',
        translation: 'маленький',
        image: 'img/small.jpg',
        audioSrc: 'audio/small.mp3',
        parentId: 4
      },
      {
        id: 3,
        word: 'fast',
        translation: 'быстрый',
        image: 'img/fast.jpg',
        audioSrc: 'audio/fast.mp3',
        parentId: 4
      },
      {
        id: 4,
        word: 'small',
        translation: 'медленный',
        image: 'img/small.jpg',
        audioSrc: 'audio/small.mp3',
        parentId: 4
      },
      {
        id: 5,
        word: 'friendly',
        translation: 'дружелюбный',
        image: 'img/friendly.jpg',
        audioSrc: 'audio/friendly.mp3',
        parentId: 4
      },
      {
        id: 6,
        word: 'unfriendly',
        translation: 'недружелюбный',
        image: 'img/unfriendly.jpg',
        audioSrc: 'audio/unfriendly.mp3',
        parentId: 4
      },
      {
        id: 7,
        word: 'young',
        translation: 'молодой',
        image: 'img/young.jpg',
        audioSrc: 'audio/young.mp3',
        parentId: 4
      },
      {
        id: 8,
        word: 'old',
        translation: 'старый',
        image: 'img/old.jpg',
        audioSrc: 'audio/old.mp3',
        parentId: 4
      }
    ]
  },
  {
    id: 5,
    name: 'Animal (set A)',
    img: '/img/pig.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'cat',
        translation: 'кот',
        image: 'img/cat.jpg',
        audioSrc: 'audio/cat.mp3',
        parentId: 5
      },
      {
        id: 2,
        word: 'chick',
        translation: 'цыплёнок',
        image: 'img/chick.jpg',
        audioSrc: 'audio/chick.mp3',
        parentId: 5
      },
      {
        id: 3,
        word: 'chicken',
        translation: 'курица',
        image: 'img/chicken.jpg',
        audioSrc: 'audio/chicken.mp3',
        parentId: 5
      },
      {
        id: 4,
        word: 'dog',
        translation: 'собака',
        image: 'img/dog.jpg',
        audioSrc: 'audio/dog.mp3',
        parentId: 5
      },
      {
        id: 5,
        word: 'horse',
        translation: 'лошадь',
        image: 'img/horse.jpg',
        audioSrc: 'audio/horse.mp3',
        parentId: 5
      },
      {
        id: 6,
        word: 'pig',
        translation: 'свинья',
        image: 'img/pig.jpg',
        audioSrc: 'audio/pig.mp3',
        parentId: 5
      },
      {
        id: 7,
        word: 'rabbit',
        translation: 'кролик',
        image: 'img/rabbit.jpg',
        audioSrc: 'audio/rabbit.mp3',
        parentId: 5
      },
      {
        id: 8,
        word: 'sheep',
        translation: 'овца',
        image: 'img/sheep.jpg',
        audioSrc: 'audio/sheep.mp3',
        parentId: 5
      }
    ]
  },
  {
    id: 6,
    name: 'Animal (set B)',
    img: '/img/lion.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'bird',
        translation: 'птица',
        image: 'img/bird.jpg',
        audioSrc: 'audio/bird.mp3',
        parentId: 6
      },
      {
        id: 2,
        word: 'fish',
        translation: 'рыба',
        image: 'img/fish1.jpg',
        audioSrc: 'audio/fish.mp3',
        parentId: 6
      },
      {
        id: 3,
        word: 'frog',
        translation: 'жаба',
        image: 'img/frog.jpg',
        audioSrc: 'audio/frog.mp3',
        parentId: 6
      },
      {
        id: 4,
        word: 'giraffe',
        translation: 'жирафа',
        image: 'img/giraffe.jpg',
        audioSrc: 'audio/giraffe.mp3',
        parentId: 6
      },
      {
        id: 5,
        word: 'lion',
        translation: 'лев',
        image: 'img/lion.jpg',
        audioSrc: 'audio/lion.mp3',
        parentId: 6
      },
      {
        id: 6,
        word: 'mouse',
        translation: 'мышь',
        image: 'img/mouse.jpg',
        audioSrc: 'audio/mouse.mp3',
        parentId: 6
      },
      {
        id: 7,
        word: 'turtle',
        translation: 'черепаха',
        image: 'img/turtle.jpg',
        audioSrc: 'audio/turtle.mp3',
        parentId: 6
      },
      {
        id: 8,
        word: 'dolphin',
        translation: 'дельфин',
        image: 'img/dolphin.jpg',
        audioSrc: 'audio/dolphin.mp3',
        parentId: 6
      }
    ]
  },
  {
    id: 7,
    name: 'Clothes',
    img: '/img/coat.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'skirt',
        translation: 'юбка',
        image: 'img/skirt.jpg',
        audioSrc: 'audio/skirt.mp3',
        parentId: 7
      },
      {
        id: 2,
        word: 'pants',
        translation: 'брюки',
        image: 'img/pants.jpg',
        audioSrc: 'audio/pants.mp3',
        parentId: 7
      },
      {
        id: 3,
        word: 'blouse',
        translation: 'блузка',
        image: 'img/blouse.jpg',
        audioSrc: 'audio/blouse.mp3',
        parentId: 7
      },
      {
        id: 4,
        word: 'dress',
        translation: 'платье',
        image: 'img/dress.jpg',
        audioSrc: 'audio/dress.mp3',
        parentId: 7
      },
      {
        id: 5,
        word: 'boot',
        translation: 'ботинок',
        image: 'img/boot.jpg',
        audioSrc: 'audio/boot.mp3',
        parentId: 7
      },
      {
        id: 6,
        word: 'shirt',
        translation: 'рубашка',
        image: 'img/shirt.jpg',
        audioSrc: 'audio/shirt.mp3',
        parentId: 7
      },
      {
        id: 7,
        word: 'coat',
        translation: 'пальто',
        image: 'img/coat.jpg',
        audioSrc: 'audio/coat.mp3',
        parentId: 7
      },
      {
        id: 8,
        word: 'shoe',
        translation: 'туфли',
        image: 'img/shoe.jpg',
        audioSrc: 'audio/shoe.mp3',
        parentId: 7
      }
    ]
  },
  {
    id: 8,
    name: 'Emotions',
    img: '/img/angry.jpg',
    linkedCards: [
      {
        id: 1,
        word: 'sad',
        translation: 'грустный',
        image: 'img/sad.jpg',
        audioSrc: 'audio/sad.mp3',
        parentId: 8
      },
      {
        id: 2,
        word: 'angry',
        translation: 'сердитый',
        image: 'img/angry.jpg',
        audioSrc: 'audio/angry.mp3',
        parentId: 8
      },
      {
        id: 3,
        word: 'happy',
        translation: 'счастливый',
        image: 'img/happy.jpg',
        audioSrc: 'audio/happy.mp3',
        parentId: 8
      },
      {
        id: 4,
        word: 'tired',
        translation: 'уставший',
        image: 'img/tired.jpg',
        audioSrc: 'audio/tired.mp3',
        parentId: 8
      },
      {
        id: 5,
        word: 'surprised',
        translation: 'удивлённый',
        image: 'img/surprised.jpg',
        audioSrc: 'audio/surprised.mp3',
        parentId: 8
      },
      {
        id: 6,
        word: 'scared',
        translation: 'испуганный',
        image: 'img/scared.jpg',
        audioSrc: 'audio/scared.mp3',
        parentId: 8
      },
      {
        id: 7,
        word: 'smile',
        translation: 'улыбка',
        image: 'img/smile.jpg',
        audioSrc: 'audio/smile.mp3',
        parentId: 8
      },
      {
        id: 8,
        word: 'laugh',
        translation: 'смех',
        image: 'img/laugh.jpg',
        audioSrc: 'audio/laugh.mp3',
        parentId: 8
      }
    ]
  }
]

export default cards;
