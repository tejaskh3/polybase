import React, { useState } from 'react'

import { Polybase } from "@polybase/client";
import { Auth } from '@polybase/auth';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth'
const auth = new Auth();

const db = new Polybase({
  defaultNamespace: "verma-tejas-project1",
});



 const Polybase1 = async () =>{

const deploySchema =
await db.applySchema(`
@public
collection User {
  id: string;
  name: string;
  rating: number;

  constructor (id: string, name: string, rating: number) {
    this.id = id;
    this.name = name;
    this.rating = rating;
  }
 }
`
);
console.log(deploySchema);
await db.collection("User").create(["0x1234", "Name",3]);
console.log("testing");
  return (
    <div>
      <h1>hii</h1>
    </div>
  )
}
export default Polybase1
