export const cs106a = [
  {
    text: "fancy_at",
    starter_code: `def fancy_at(s):
    pass`,
    value: `Given string s. Return the string with '@@' added at its beginning and end. Unless the string is length 3 or less, then add a more modest '@' at both ends.`,
  },
  {
    text: "odo",
    starter_code: `def odo(s):
    pass`,
    value: `Given string s. If the first and third chars in the string are the same, then return a version of the string with that char added at the beginning and end of the string. Otherwise, of if the string is too short, return the string unchanged.`,
  },
  {
    text: "cab_code",
    starter_code: `def cab_code(s):
    pass`,
    value: `Given string s. If the string is length 3, return a version of the string with the three chars changed according to the "cab" code. This just switches the order of the three chars, so 'abc' becomes 'cab'. If the string is not length 3, return it unchanged.`,
  },
  {
    text: "Red Channel",
    starter_code: `def red_channel(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pixel.green = pixel.green * 0.5
        pixel.blue = pixel.blue * 0.5
        pixel.red = pixel.red * 0.5
        # or shorthand form:
        # pixel.red *= 0.5
    return image`,
    value: `Load the image for the given filename. Change the image as follows: For every pixel, set the green and blue values to 0. This switches off all the green and blue lights, leaving only the red lights, aka the red channel. Return the changed image.`,
  },
  {
    text: "Darker",
    starter_code: `def darker(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pixel.green = 0
        pixel.blue = 0
    return image`,
    value: `Load the image for the given filename. Make the image darker by halving the red, green, and blue values. Return the changed image.`,
  },
  {
    text: "Copper Puzzle",
    starter_code: `def solve_copper(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pass # your code here
    return image`,
    value: `The copper puzzle: a picture of something famous is hidden in the input image. The red values are all meaningless noise, and should be set to 0. The green and blue values are 10x smaller than the correct values. Write code to fix the image. Return the fixed image.`,
  },
  {
    text: "Banana 5-10-20 Puzzle",
    starter_code: `def solve_banana(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pass # your code here
    return image`,
    value: `Fix the 5-10-20 puzzle image of a banana sitting on red bricks. The red, green, and blue values are 5, 10, and 20 times too small. Figure out which color goes with which factor.`,
  },
  {
    text: "Iron Puzzle",
    starter_code: `def solve_iron(filename):
    image = SimpleImage(filename)
    pass # your code here
    return image`,
    value: `A picture of a famous iron object is hidden in the input image. In the input image, the red and green values are meaningless noise, appearing as little dots. The blue value of each input pixel is 1/5 of its correct value. The correct red and green values are simply the same as the blue value. So if a pixel's correct blue is 220, then its red and green should also be 220. Write code to fix the problems in the input image and return it, revealing the iron object. The resulting image will be grayscale, since when a pixel's red, green, and blue values are all equal, that pixel is a shade of gray.`,
  },
  {
    text: "Watermelon 5-10-20 Puzzle",
    starter_code: `def solve_melon(filename):
    image = SimpleImage(filename)

    pass # your code here

    return image`,
    value: `The input is a 5-10-20 puzzle image of a watermelon sitting on a tan cutting board. Write code to fix the image and return it. Figure out which factor goes with which color by experimentation.`,
  },
  {
    text: "Darker Nested",
    starter_code: `def darker(filename):
    image = SimpleImage(filename)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
            pixel.red *= 0.5
            pixel.green *= 0.5
            pixel.blue *= 0.5
    return image`,
    value: `Use nested range loops to modify the original image. Make all the pixels darker by multiplying the red/green/blue values by 0.5. Return the modified image.`,
  },
  {
    text: "Darker Out",
    starter_code: `def darker(filename):
    image = SimpleImage(filename)
    # Create out image, same size as original
    out = SimpleImage.blank(image.width, image.height)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
            # Key: set data into pixel in *out image*
            pixel_out = out.get_pixel(x, y)
            pixel_out.red = pixel.red * 0.5
            pixel_out.green = pixel.green * 0.5
            pixel_out.blue = pixel.blue * 0.5
    return out`,
    value: `Create a new "out" image the same size as the original image. Set darker versions of every pixel into the out image, multiplying the red/green/blue values by 0.5. Return the out image. This demonstates having a separate out image and nested loops.`,
  },
  {
    text: "Green Channel Nested",
    starter_code: `def green_channel(filename):
    image = SimpleImage(filename)
    pass`,
    value: `Create a new out image the same size as the original image. Write nested loop code to set the green channel of the original image into the out image. Do this by copying the green values, and setting red and blue values to 0 for each pixel in the out image. Return the out image.`,
  },
  {
    text: "Darker Left",
    starter_code: `def darker_left(filename):
    image = SimpleImage(filename)
    pass
    return image`,
    value: `The "left" parameter is an int value, ranging from zero to the width of the original image. Modify the original image by darkening a stripe "left" pixels width down its left side. Darken each pixel by multiplying the red/green/blue values by 0.5. Return the modified image. (This problem uses an int parameter, but not a separate out image.)`,
  },
  {
    text: "Copy Left",
    starter_code: `def copy_left(filename):
    image = SimpleImage(filename)
    pass`,
    value: `Create a new out image the same size as the original image. The "left" parameter is an int value, ranging from zero to the original image width. Copy a stripe "left" pixels wide from the left side of the original image to the out image. So if left is 10, copy a 10 pixel wide stripe. Return the out image.`,
  },
  {
    text: "image shift",
    starter_code: ``,
    value:
      "Create an out image 10 pixels wider than the original. (1) Set an aqua colored vertical stripe 10 pixels wide at the left by setting red to 0, leaving green and blue at 255. (2) Copy the original image just to the right of the aqua stripe. Return the computed out image.",
  },
  {
    text: "Aqua 10",
    starter_code: `def aqua_stripe(filename):
    image = SimpleImage(filename)
    pass`,
    value: `Create an out image 10 pixels wider than the original. (1) Set an aqua colored vertical stripe 10 pixels wide at the left by setting red to 0, leaving green and blue at 255. (2) Copy the original image just to the right of the aqua stripe. Return the computed out image.`,
  },
  {
    text: "Aqua N",
    starter_code: `def aqua_stripe(filename):
    image = SimpleImage(filename)
    pass`,
    value: `The "n" parameter is an int value, zero or more. The code in the function should use whatever value is in n. (Values of n appear in the Cases menu.) Create an out image n pixels wider than the original. (1) Set an aqua colored vertical stripe n pixels wide at the left by setting red to 0, leaving green and blue at 255. (2) Copy the original image just to the right of the aqua stripe. Return the computed out image.`,
  },
  {
    text: "Side N",
    starter_code: `def side_n(filename):
    image = SimpleImage(filename)
    pass`,
    value: `The "n" parameter is an int value, zero or more. The code in the function should use whatever value is in n. (Values of n appear in the Cases menu.)

    Create an out image with a copy of the original image with n-pixel-wide blank areas added on its left and right sides. Return the out image.`,
  },
  {
    text: "Mirror1",
    starter_code: `def mirror1(filename):
    image = SimpleImage(filename)
    # Create an out image twice as wide as the original.
    out = SimpleImage.blank(image.width * 2, image.height)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
            # left copy
            pixel_left = out.get_pixel(x, y)
            pixel_left.red = pixel.red
            pixel_left.green = pixel.green
            pixel_left.blue = pixel.blue
            # right copy
            # nothing!
    return out`,
    value: `Read the original image at the given filename. Create a new "out" image twice as wide as the original. Copy the original image to the left half of out, leaving the right half blank. Return the out image (this is a halfway-point to the mirror2 problem).`,
  },
  {
    text: "Mirror2",
    starter_code: `def mirror2(filename):
    image = SimpleImage(filename)
    out = SimpleImage.blank(image.width * 2, image.height)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
                # left copy
                pixel_left = out.get_pixel(x, y)
                pixel_left.red = pixel.red
                pixel_left.green = pixel.green
                pixel_left.blue = pixel.blue
                # right copy
                # this is the key spot
                # have: pixel at x,y in image
                # want: pixel_right at ??? to write to
                pass
        return out`,
    value: `Like mirror1, but also copy the original image to the right half of "out" as a horizontally flipped mirror image. Return the out image. Starter code does the left half, right half TBD.`,
  },
  {
    text: "Mirror3",
    starter_code: `def mirror3(filename):
    image = SimpleImage(filename)
    out = SimpleImage.blank(image.width * 2, image.height)
    pass
    
    return out`,
    value: `Create and return an out image twice as wide as the original image. Copy to the out image two, side by side copies of the original image with the left copy vertically flipped upside down.`,
  },
];

export const cs106b = [
  {
    text: "Checking Complementary Strands (Medium)",
    starter_code: `bool areComplementaryStrands(string one, string two) {\n}`,
    value: `DNA strands are made up of smaller units called nucleotides. There are four different nucleotides present in DNA, which are represented by the letters A, C, G, and T. Any DNA strand, therefore, can be thought of as string consisting of the nucleotides that make up that strand, in order. In DNA, each strand is paired with a complementary strand of the same length. The nucleotides in a complementary strand pair off as follows: A pairs with T, and C pairs with G.`,
    styledValue: (
      <>
        <p>
          DNA strands are made up of smaller units called nucleotides. There are
          four different nucleotides present in DNA, which are represented by
          the letters A, C, G, and T. Any DNA strand, therefore, can be thought
          of as string consisting of the nucleotides that make up that strand,
          in order.
        </p>
        <p>
          In DNA, each strand is paired with a complementary strand of the same
          length. The nucleotides in a complementary strand pair off as follows:
          A pairs with T, and C pairs with G.
        </p>
        <p>
          Write a recursive function{" "}
          <b className="text-red-500">
            bool areComplementaryStrands(string one, string two)
          </b>{" "}
          that takes as input two DNA strands, then returns whether those
          strands are complementary.
        </p>
      </>
    ),
    solution: `char complementOf(char nucleotide) {
  switch (nucleotide) {
    case 'A':return 'T';
    case 'C':return 'G';
    case 'G':return 'C';
    case 'T':return 'A';
    default: error("Unknown nucleotide?");
  }
}
    
bool areComplementaryStrands(string one, string two) {
  if (one.length() != two.length()) {
    return false;
  } else if (one == "") {
    return true;
  } else {
    return complementOf(one[0]) == two[0] && areComplementaryStrands(one.substr(1), two.substr(1));
  }
}`,
  },
  {
    text: "Ddeeddoouubblliinngg (Easy)",
    starter_code: `string dedouble(const string& str)`,
    styledValue: (
      <>
        <p>
          In the early part of the 20th century, there was considerable interest
          in both England and the United States in simplifying the rules used
          for spelling English words, which has always been a difficult
          proposition. One suggestion advanced as part of this movement was the
          removal of all doubled letters from words. If this were done, no one
          would have to remember that the name of the Stanford student union is
          spelled “Tresidder,” even though the incorrect spelling “Tressider”
          occurs at least as often. If doubled letters were banned, everyone
          could agree on “Tresider.”
        </p>

        <p>
          Write a recursive function{" "}
          <b className="text-red-500">string dedouble(const string& str)</b>{" "}
          that takes a string as its argument and returns a new string with any
          consecutive substring consisting of repeated copies of the same letter
          replaced by a single copy letter of that letter. Your function should
          not try to consider the case of the letters. For example, calling the
          function on the name "Lloyd" should return the argument unchanged
          because 'L' and 'l' are different letters. Your function must be
          purely recursive and may not make use of any iterative constructs such
          as for or while.
        </p>
      </>
    ),
    value: `In the early part of the 20th century, there was considerable interest in both England and the United States in simplifying the rules used for spelling English words, which has always been a difficult proposition. One suggestion advanced as part of this movement was the removal of all doubled letters from words. If this were done, no one would have to remember that the name of the Stanford student union is spelled “Tresidder,” even though the incorrect spelling “Tressider” occurs at least as often. If doubled letters were banned, everyone could agree on “Tresider.” Write a recursive function 'string dedouble(const string& str)' that takes a string as its argument and returns a new string with any consecutive substring consisting of repeated copies of the same letter replaced by a single copy letter of that letter. Your function should not try to consider the case of the letters. For example, calling the function on the name "Lloyd" should return the argument unchanged because 'L' and 'l' are different letters. Your function must be purely recursive and may not make use of any iterative constructs such as for or while.`,
    solution: `string dedouble(const string& str) {
      if (str.length() <= 1) {
          return str;
      } else if (str[0] == str[1]) {
        return dedouble(str.substr(1));
      } else {
        return str[0] + dedouble(str.substr(1));
      }
    }`,
  },
  {
    text: "Even words (Easy)",
    starter_code: `bool isEvenWord(const string& word){}`,
    styledValue: (
      <>
        <p>
          An <b>even word</b> is a word that contains an even number of copies
          of every letter. For example, the word “tattletale” is an even word,
          since there are four copies of 't' and two copies of 'a,' 'e,' and
          'l.' Similarly, “appeases” and “arraigning” are even words. However,
          “banana” is not an even word, because there is just one 'b' and three
          copies of 'a.'
        </p>

        <p>
          Write a recursive function{" "}
          <b className="text-red-500">bool isEvenWord(const string& word);</b>{" "}
          that takes as input a word, then returns whether it's an even word.
          You can assume the text you're given consists purely of letters and
          don't need to handle the case where there are numbers, spaces, etc.
          Ideally, your solution should be case-insensitive.
        </p>
      </>
    ),
    value: `An even word is a word that contains an even number of copies of every letter. For example, the word “tattletale” is an even word, since there are four copies of 't' and two copies of 'a,' 'e,' and 'l.' Similarly, “appeases” and “arraigning” are even words. However, “banana” is not an even word, because there is just one 'b' and three copies of 'a.'
    Write a recursive function 'bool isEvenWord(const string& word);' that takes as input a word, then returns whether it's an even word. You can assume the text you're given consists purely of letters and don't need to handle the case where there are numbers, spaces, etc. Ideally, your solution should be case-insensitive.`,
    solution: `bool isEvenWord(const string& word) {
      if (word == "") {
        return true;
      }
      else {
        int nextCopy = word.find(word[0], 1);
        if (nextCopy == string::npos) {
          return false;
        }
        return isEvenWord(word.substr(1, nextCopy - 1) + word.substr(nextCopy + 1));
      }
    }`,
  },
  {
    text: "Eating a Chocolate Bar (Hard)",
    starter_code: "int numWaysToEat(int numSquares)",
    value: `You have a chocolate bar that's subdivided into a row of n squares. You want to eat the candy bar from left to right. To do so, you'll break off a piece, eat it, then break off another, eat that one, etc. This question is all about using recursion to see different ways of doing this and what that looks like from a C++ perspective.

    To start things off, let's begin by enforcing a rule. You'll eat the chocolate bar from left to right, and at each point you can either break off a single square or two squares. For example, suppose you have a chocolate bar with five pieces. You could break off a piece of size two, then a piece of size one, and then eat the remaining two squares. Or you could eat one square, then two squares, then one square, and then one more square. There are eight total ways you could eat this chocolate bar, which I'll denote by listing out the sizes of the squares you'll eat:
    
    - 1, 1, 1, 1, 1
    - 1, 1, 1, 2
    - 1, 1, 2, 1
    - 1, 2, 1, 1
    - 1, 2, 2
    - 2, 1, 1, 1
    - 2, 1, 2
    - 2, 2, 1
    
    Notice that order matters here. As a first step, let's write some code to count how many ways you can eat a chocolate bar according to these rules.
    
    Write a function "int numWaysToEat(int numSquares)" that returns the number of ways to eat a chocolate bar consisting of a row of numSquares squares, subject to the restriction that you can only eat one or two squares at a time. If the number of squares is negative, call error to report an error. (You can eat a chocolate bar with no squares, and there's only one way to do it, which is to not eat anything at all.)`,
    styledValue: (
      <>
        <p>
          You have a chocolate bar that's subdivided into a row of n squares.
          You want to eat the candy bar from left to right. To do so, you'll
          break off a piece, eat it, then break off another, eat that one, etc.
          This question is all about using recursion to see different ways of
          doing this and what that looks like from a C++ perspective.
        </p>

        <p>
          To start things off, let's begin by enforcing a rule. You'll eat the
          chocolate bar from left to right, and at each point you can either
          break off a single square or two squares. For example, suppose you
          have a chocolate bar with five pieces. You could break off a piece of
          size two, then a piece of size one, and then eat the remaining two
          squares. Or you could eat one square, then two squares, then one
          square, and then one more square. There are eight total ways you could
          eat this chocolate bar, which I'll denote by listing out the sizes of
          the squares you'll eat:
        </p>

        <ul>
          <li>1, 1, 1, 1, 1</li>
          <li>1, 1, 1, 2</li>
          <li>1, 1, 2, 1</li>
          <li>1, 2, 1, 1</li>
          <li>1, 2, 2</li>
          <li>2, 1, 1, 1</li>
          <li>2, 1, 2</li>
          <li>2, 2, 1</li>
        </ul>
        <br />
        <p>
          Notice that order matters here. As a first step, let's write some code
          to count how many ways you can eat a chocolate bar according to these
          rules.
        </p>

        <p>
          Write a function{" "}
          <b className="text-red-500">int numWaysToEat(int numSquares)</b> that
          returns the number of ways to eat a chocolate bar consisting of a row
          of <b>numSquares</b> squares, subject to the restriction that you can
          only eat one or two squares at a time. If the number of squares is
          negative, call <b>error</b> to report an error. (You <b>can</b> eat a
          chocolate bar with no squares, and there's only one way to do it,
          which is to not eat anything at all.
        </p>
      </>
    ),
    solution: `int numWaysToEat(int numSquares) {
      if (numSquares < 0) {
          error("Negative chocolate? YOU MONSTER!");
      }

      if (numSquares <= 1) {
        return 1;
      } else {
        return numWaysToEat(numSquares - 1) + numWaysToEat(numSquares - 2);
      }
    }`,
  },
];
