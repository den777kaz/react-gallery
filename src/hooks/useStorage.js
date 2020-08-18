import {useState, useEffect} from 'react';
import {projectFirestore, projectStorage, timestamp} from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef    = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');


        storageRef.put(file).on('state_changed', (snap) => {
            let procentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(procentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createAt = timestamp();
            const imageName = file.name;
            collectionRef.add({url, createAt, imageName});
            setUrl(url);
        })


    }, [file])

    return {progress, url, error}
};

export default useStorage;
