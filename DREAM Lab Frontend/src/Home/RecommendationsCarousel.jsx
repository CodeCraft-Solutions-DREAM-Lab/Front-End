function RecommendationsCarousel(props) {
    const { images, processedTranscript } = props; // Ensure processedTranscript is received here

    console.log("Processed Transcript:", processedTranscript); // Log the processedTranscript prop

    // Check if processedTranscript is available before rendering
    if (!processedTranscript) {
        return (
            <div>Loading...</div>
        );
    }

    // Render the carousel once processedTranscript is available
    return (
        <div style={{ width: props.width }}>
            <Flicking
                circular={true}
                plugins={plugins}
                panelsPerView={3}
                align="center"
                preventClickOnDrag={true}
                preventDefaultOnDrag={true}>
                {images.map((image, index) => (
                    <div key={index}
                        className="card-panel"
                        style={{
                            width: props.imageWidth,
                            height: props.imageHeight,
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                        <img
                            className="imageCarousel"
                            src={image.url}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="transcriptOverlay">
                            <p>{processedTranscript}</p>
                        </div>
                    </div>
                ))}
            </Flicking>
        </div>
    );
};

export default RecommendationsCarousel;
