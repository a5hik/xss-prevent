/**
 * Created by ashik on 12/16/13.
 *
 * The xss-prevent library provides a solid set of functions for encoding output for
 * the most common context targets in web applications (e.g. HTML, XML, JavaScript, etc).
 * The library also takes a conservative view of what are allowable characters
 * based on historical vulnerabilities, and current injection techniques.
 *
 * this also provides equivalent decoding functions for the encoded text's.
 *
 * The Library uses the encoding techniques of of http://code.google.com/p/reform/
 */


/**
 *  The encodeHtml function takes in a string and performs HTML
 *  encoding using the &#NN; style encoding where NN is the decimal number of
 *  the character. The encoding style is the same for both Unicode and non
 *  Unicode characters.
 *
 * @param $str [in] String to encode. If string is null then '' is used.
 * @return Returns an HTML encoded string.
 */
function encodeHtml($str) {
    if ($str == null || $str.length == 0) {
        $str = '';
    }

    $out = '';
    $len = $str.length;

    // Allow: a-z A-Z 0-9
    // Allow (dec): 97-122 65-90 48-57

    for ($cnt = 0; $cnt < $len; $cnt++) {
        $c = $str.charCodeAt($cnt);
        if (($c >= 97 && $c <= 122) ||
            ($c >= 65 && $c <= 90 ) ||
            ($c >= 48 && $c <= 57 )) {
            $out += $str.charAt($cnt);
        } else {
            $out += '&#' + $c + ';';
        }
    }

    return $out;
}

/**
 *  The decodeHtml function takes in a string and performs HTML
 *  decoding using the &#NN; style decoding where NN is the decimal number of
 *  the character.
 *
 * @param $str [in] String to decode.
 *  If string is null. then an empty string will be used instead.
 * @return Returns an HTML decoded string.
 */

function decodeHtml($str) {
    if ($str == null || $str.length == 0) {
        $str = '';
    }

    // look for numerical entities &#34;
    $arr = $str.match(/&#[0-9]{1,5};/g);

    // if no matches found in string then skip
    if ($arr != null) {
        for (var x = 0; x < $arr.length; x++) {
            $m = $arr[x];
            $c = +$m.substring(2, $m.length - 1); //get numeric part which is reference to unicode character
            // if its a valid number we can decode
            if ($c >= -32768 && $c <= 65535) {
                // decode every single match within string
                $str = $str.replace($m, String.fromCharCode($c));
            } else {
                $str = $str.replace($m, ""); //invalid so replace
            }
        }
    }

    return $str;
}