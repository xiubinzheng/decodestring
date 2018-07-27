/**
 * @param {string} s
 * @return {string}
 */

/*

Challenge #1
Given an encoded string, return it’s corresponding decoded string.
The encoding rule is: k[encoded_string] where the encoded_string inside the brackets is repeated k times.
NOTE: k is guaranteed to be a positive integer.
CONSTRAINT: Solution should have linear complexity.                   

Examples:

fn( 4[ab] ) => abababab
fn( 2[b3[a]] ) => baaabaaa
fn( z1[y]zz3[ab2[c]a] ) => zyzzabccaabccaabcca

 


time(O(n)),
space(O(n))
*/
  function decodeString(s) {
    if (s.length === 0 || !s ) {
            return s;
        }
        let stringStack = [];
        let numStack = [];
    /* result repsents any subsquence value of the 
    character within the brackets and its multiples
    */
        let result = '';
        let index = 0;
    // interate the string 
        while (index < s.length) {
            /* if the current character is a number, convert the string
            to integer
            */
            if (!isNaN(s.charAt(index))) {
                let num = 0;
                while (!isNaN(s.charAt(index))) {
                    /* 
                    this will account for an single digit numbers,
                    example 10,110,200 ex
                    */
                    num = num * 10 + parseInt(s.charAt(index));
                    index++;
                }
                // push to the number stack
                numStack.push(num);
            } 
            /* 
            if the current character is a '['
            then we know that next one is a character
            
            */
            else if (s.charAt(index) == '[') {
                /* 
                push onto our string stack of the result buffer,
                where it contains the value of the previous buffer
                
                */
                stringStack.push(result);
                result = '';
                /* move our index by one since we don't add bracket to buffer*/
                index++;
            } 
            /*
            if it is the end bracket, 
            the deepest nest bracket
            */
            else if (s.charAt(index) == ']') {
                /* 
                temp will represent the string buffer value that we have 
                last seem in the previous bracket block or just empty '' if it is the first one,
                count will represent the number that we have last seem 
                */
                let temp = stringStack.pop();
                let count = numStack.pop();
                for (let i = 0; i < count; i++) {
                    temp+=result;
                }
                result = temp;
                index++;
            } else {
                
                /*if it is just characters append to the result string*/
                result+=s.charAt(index);
                index++;
            }
        }
        return result;
}


/*
fn( 4[ab] ) => abababab
fn( 2[b3[a]] ) => baaabaaa
fn( z1[y]zz3[ab2[c]a] ) => zyzzabccaabccaabcca
*/
console.log(decodeString('4[ab]'));
console.log(decodeString('2[b3[a]]')); 
console.log(decodeString('z1[y]zz3[ab2[c]a]'));