<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['services_read']]
)]
class Service
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"services_read", "infirmiers_read", "patients_read", "sejour_read"})
     */
    private $id;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"services_read", "infirmiers_read", "patients_read", "sejour_read"})
     */
    private $nom;

    /**
     * @ORM\OneToMany(targetEntity=Infirmier::class, mappedBy="service")
     */
    private $infirmiers;

    /**
     * @ORM\OneToMany(targetEntity=ServiceSejour::class, mappedBy="service")
     */
    private $sejours;

    public function __construct()
    {
        $this->infirmiers = new ArrayCollection();
        $this->sejours = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection|Infirmier[]
     */
    public function getInfirmiers(): Collection
    {
        return $this->infirmiers;
    }

    public function addInfirmier(Infirmier $infirmier): self
    {
        if (!$this->infirmiers->contains($infirmier)) {
            $this->infirmiers[] = $infirmier;
            $infirmier->setService($this);
        }

        return $this;
    }

    public function removeInfirmier(Infirmier $infirmier): self
    {
        if ($this->infirmiers->removeElement($infirmier)) {
            // set the owning side to null (unless already changed)
            if ($infirmier->getService() === $this) {
                $infirmier->setService(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ServiceSejour[]
     */
    public function getSejours(): Collection
    {
        return $this->sejours;
    }

    public function addSejour(ServiceSejour $sejour): self
    {
        if (!$this->sejours->contains($sejour)) {
            $this->sejours[] = $sejour;
            $sejour->setService($this);
        }

        return $this;
    }

    public function removeSejour(ServiceSejour $sejour): self
    {
        if ($this->sejours->removeElement($sejour)) {
            // set the owning side to null (unless already changed)
            if ($sejour->getService() === $this) {
                $sejour->setService(null);
            }
        }

        return $this;
    }
}
