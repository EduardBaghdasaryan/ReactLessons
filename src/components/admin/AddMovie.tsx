import React, { FC } from "react";
import useMovieForm from "../../hooks/useMovieForm";

const AddMovie: FC = () => {
  const { formData, handleChange, handleSubmit } = useMovieForm();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Genres (comma-separated):
          <input
            type="text"
            name="genres"
            value={formData.genres.join(",")}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Actors (comma-separated):
          <input
            type="text"
            name="actors"
            value={formData.actors.join(",")}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Video URL:
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddMovie;
