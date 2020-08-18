import React from 'react';
import useFirestore from "../hooks/useFirestore";
import {motion} from 'framer-motion';
import {projectFirestore, projectStorage} from "../firebase/config";
import deleteLogo from '../images/remove.svg';

const ImageGrid = ({setSelectedImg}) => {
    const {docs} = useFirestore('images');

    const deleteHandler = (id, fileName) => {
        // Create a reference to the file to delete
        const imageRef = projectStorage.ref(fileName);

        // Delete the file
        imageRef.delete().then(() => {
            // File deleted successfully
            console.log("File deleted successfully")
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log("Uh-oh, an error occurred")
        });


        projectFirestore.collection("images")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });

    }
    return (
        <div className="img-grid">
            {docs && docs.map((doc) => (
                <motion.div
                    key={doc.id}
                    className="img-wrap"
                    whileHover={{opacity: 1}}
                    layout
                >
                    <motion.img
                        alt="small pic"
                        onClick={() => setSelectedImg(doc.url)}
                        src={doc.url}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1}}
                    />
                    <div className="options">
                        <img
                            onClick={() => deleteHandler(doc.id, doc.imageName)}
                            src={deleteLogo}
                            alt="delete"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ImageGrid;
