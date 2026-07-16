const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'ispjadjc', 
  api_key: '124741436514314', 
  api_secret: '-i1JaQvwV-x6fqxuoOJq0ZUFMss' 
});

(async function run() {
  try {
    console.log("Uploading image...");
    // 2. Upload an image
    const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", {
      public_id: "my_sample_image"
    });
    
    console.log("Upload successful!");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);
    
    console.log("\nFetching image details...");
    // 3. Get image details
    const imageDetails = await cloudinary.api.resource(uploadResult.public_id);
    console.log("Image Details:");
    console.log("- Width:", imageDetails.width);
    console.log("- Height:", imageDetails.height);
    console.log("- Format:", imageDetails.format);
    console.log("- File size (bytes):", imageDetails.bytes);
    
    console.log("\nGenerating transformed image...");
    // 4. Transform the image
    // fetch_format: 'auto' (f_auto) -> Automatically choose the most efficient image format based on the browser (e.g., WebP/AVIF)
    // quality: 'auto' (q_auto) -> Automatically optimize image quality to reduce file size without visible degradation
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto'
    });
    
    console.log("Done! Click link below to see optimized version of the image. Check the size and the format.");
    console.log(transformedUrl);
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
