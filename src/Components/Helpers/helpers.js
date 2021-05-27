function getIndices(input, search) {

   let indices = [];
   for (let i = 0; i < input.length; i++) {
      if (input[i] === search) indices.push(i);
   }
   return indices.join(",");

}

export { getIndices };
