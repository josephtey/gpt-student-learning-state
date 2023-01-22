import { collection, doc, setDoc } from "firebase/firestore"; 
const ils = collection(db, "individual_learning_state");

export const getHint = (code, GPTResponse, prompt, context, feedback) => {
    // create a new document in main collection
    let rand = Math.random() * (5) + 1; 
    const docRef = doc(db, "contexts", "context" + rand);
    const docSnap = await getDoc(docRef);
    const data  = docSnap.data();

    const newRef = doc(collection(db, "contexts"));
    const inp_data = {
        code: code, 
        evaluation: -1, 
        GPTResponse: GPTResponse,
        prompt: prompt, 
        context: data.input(),
        feedback: "",
    }
    const id = await setDoc(newRef, inp_data);
    return id;
}

export const updateEvaluation = (feedback, score, id) => {
    const docRef = doc(db, "individual_learning_state", id);
    await updateDoc(docRef, {
        evaluation: score,
        feedback: feedback
    });
}
